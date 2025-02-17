import { load } from 'cheerio';
import axios from 'axios';
import type { Document } from '@langchain/core/documents';
import { addDocuments } from './vector-store';

interface ArticleMetadata {
  title: string;
  link: string;
  issueNumber: string;
  issueLink: string;
  issueDate: string;
  description: string;
}

/**
 * Helper to format a date string into yyyy-mm-dd format.
 * If the input cannot be parsed as a date, it returns the original string.
 */
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return dateStr;
  }
  return date.toISOString().slice(0, 10);
}

/**
 * Parses the HTML of a JS Weekly issue and returns an array of Documents.
 */
export function parseIssue(html: string, issueLink: string): Document[] {
  const $ = load(html);

  const issueInfoText = $('.el-splitbar p').first().text().trim();
  let issueNumber = '';
  let issueDateRaw = '';
  if (issueInfoText) {
    const parts = issueInfoText.split('—').map((s) => s.trim());
    if (parts.length >= 2) {
      issueNumber = parts[0].replace(/\D/g, '');
      issueDateRaw = parts[1];
    }
  }
  const issueDate = formatDate(issueDateRaw);

  const articleElements = $('table.el-item.item');
  const documents: Document[] = [];

  articleElements.each((i: number, el: any) => {
    const descElement = $(el).find('p.desc');
    if (!descElement || descElement.length === 0) return;

    const mainLink = descElement.find('span.mainlink a').first();
    if (!mainLink || mainLink.length === 0) return;
    const articleTitle = mainLink.text().trim();
    const articleLink = mainLink.attr('href')?.trim() || '';

    const pClone = descElement.clone();
    pClone.find('span.mainlink').remove();
    let description = pClone.text().trim();
    if (description.startsWith('—')) {
      description = description.substring(1).trim();
    }

    const metadata: ArticleMetadata = {
      title: articleTitle.toString(),
      link: articleLink,
      issueNumber: issueNumber,
      issueLink: issueLink,
      issueDate,
      description
    };

    const pageContent = `${articleTitle}\n\n${description}`;
    documents.push({ pageContent, metadata });
  });

  return documents;
}

/**
 * Processes an issue by parsing its HTML and adding its articles to the vector store.
 */
export async function vectorizeIssue(html: string, issueLink: string): Promise<void> {
  try {
    const $ = load(html);

    const issueInfoText = $('.el-splitbar p').first().text().trim();
    let issueNumber = '';
    let issueDateRaw = '';
    if (issueInfoText) {
      const parts = issueInfoText.split('—').map((s) => s.trim());
      if (parts.length >= 2) {
        issueNumber = parts[0].replace(/\D/g, '');
        issueDateRaw = parts[1];
      }
    }
    const issueDate = formatDate(issueDateRaw);

    const articleElements = $('table.el-item.item');
    const documents: Document[] = [];
    const ids: string[] = [];

    articleElements.each((i: number, el: any) => {
      const descElement = $(el).find('p.desc');
      if (!descElement || descElement.length === 0) return;

      const mainLink = descElement.find('span.mainlink a').first();
      if (!mainLink || mainLink.length === 0) return;
      const articleTitle = mainLink.text().trim();
      const articleLink = mainLink.attr('href')?.trim() || '';

      const pClone = descElement.clone();
      pClone.find('span.mainlink').remove();
      let description = pClone.text().trim();
      if (description.startsWith('—')) {
        description = description.substring(1).trim();
      }

      const metadata: ArticleMetadata = {
        title: `${articleTitle}`,
        link: articleLink.toString(),
        issueNumber: issueNumber.toString(),
        issueLink,
        issueDate,
        description
      };

      const pageContent = `${articleTitle}\n\n${description}`;
      documents.push({ pageContent, metadata });
      ids.push(`${issueNumber}-${i}`);
    });

    if (documents.length > 0) {
      await addDocuments(documents, ids);
      console.log(
        `Successfully vectorized ${documents.length} articles for issue #${issueNumber} (${issueDate}).`
      );
    } else {
      console.warn(`No articles found for issue #${issueNumber}.`);
    }
  } catch (error) {
    console.error('Error vectorizing the issue:', error);
    throw error;
  }
}

/**
 * Loads all articles by fetching the JS Weekly archive page,
 * extracting all issue links, and processing them in chunks.
 */
export async function loadAllArticles(): Promise<void> {
  try {
    const archiveUrl = 'https://javascriptweekly.com/issues';
    const archiveResponse = await axios.get(archiveUrl);
    const $ = load(archiveResponse.data);

    const issueLinks: string[] = $('div.issue a')
      .map((_, el: any) => {
        const href = $(el).attr('href');
        return href ? `https://javascriptweekly.com/${href}` : null;
      })
      .get()
      .filter((link): link is string => link !== null);

    console.log(`Found ${issueLinks.length} issues.`);

    const chunkSize = 50;
    for (let i = 0; i < issueLinks.length; i += chunkSize) {
      const chunk = issueLinks.slice(i, i + chunkSize);
      await Promise.allSettled(
        chunk.map(async (link: string) => {
          console.log(`Processing issue: ${link}`);
          try {
            const issueResponse = await axios.get(link);
            const issueHtml = issueResponse.data;
            await vectorizeIssue(issueHtml, link);
          } catch (error) {
            console.error(`Error processing issue at ${link}`, error);
          }
        })
      );
    }
    console.log('Completed initial load of all articles.');
  } catch (error) {
    console.error('Error loading all articles:', error);
    throw error;
  }
}
