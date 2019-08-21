import TurndownService from 'turndown';
import sanitize from 'sanitize-html';

const turndownService = new TurndownService({ emDelimiter: '*' });

const json2md = data => {
  let html = '';
  if (!data) return '';
  data.blocks.forEach(b => {
    if (b.type === 'paragraph') {
      html += `${turndownService.turndown(b.data.text)}\n\n`;
    } else if (b.type === 'header') {
      Array(b.data.level)
        .fill()
        .forEach(() => {
          html += '#';
        });
      html += ` ${b.data.text}\n\n`;
    } else if (b.type === 'list') {
      if (b.data.style === 'ordered') {
        b.data.items.forEach((i, index) => {
          html += `${index + 1}. ${i}\n`;
        });
      } else {
        b.data.items.forEach(i => {
          html += `- ${i}\n`;
        });
      }
      html += '\n\n';
    } else if (b.type === 'image') {
      if (b.data.caption) {
        html += `![${sanitize(b.data.caption, { allowedTags: [] })}]`;
      } else html += '![]';
      html += `(${b.data.file.url})\n\n`;
    } else if (b.type === 'quote') {
      html += `> ${b.data.text}\n`;
      if (b.data.caption) html += `> **${b.data.caption}**\n`;
      html += '\n';
    } else if (b.type === 'delimiter') {
      html += `---\n\n`;
    } else if (b.type === 'embed') {
      // Source is automatically rendered when parsing
      html += `${b.data.source}\n\n`;
    } else if (b.type === 'table') {
      // html += '<table>';
      b.data.content.forEach((c, index) => {
        html += '| ';
        if (index === 0) {
          c.forEach(t => {
            html += `${t} |`;
          });
          html += '\n|';
          c.forEach(() => {
            html += ` --- |`;
          });
        } else {
          c.forEach(t => {
            html += `${t} |`;
          });
        }
        html += '\n';
      });
      html += '\n';
    }
  });
  return html;
};

export default json2md;
