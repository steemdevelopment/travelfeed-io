const json2Html = data => {
  let html = '';
  if (!data) return '';
  data.blocks.forEach(b => {
    if (b.type === 'paragraph') {
      html += `<p>${b.data.text}</p>\n`;
    } else if (b.type === 'header') {
      html += `<h${b.data.level}>${b.data.text}</h${b.data.level}>\n`;
    } else if (b.type === 'list') {
      html += (b.data.style === 'ordered' && '<ol>') || '<ul>';
      b.data.items.forEach(i => {
        html += `<li>${i}</li>`;
      });
      html += `${(b.data.style === 'ordered' && '</ol>') || '</ul>'}\n`;
    } else if (b.type === 'image') {
      html += `<center><img src="${b.data.file.url}" /></center>\n`;
      if (b.data.caption) {
        html += `<center><sup>${b.data.caption}</sup></center>\n`;
      }
    } else if (b.type === 'quote') {
      html += `<blockquote>${b.data.text}${
        b.data.caption ? `<br /><sub>${b.data.caption}</sub>` : ''
      }</blockquote>\n`;
    } else if (b.type === 'delimiter') {
      html += `<hr />\n`;
    } else if (b.type === 'embed') {
      // Source is automatically rendered when parsing
      html += `${b.data.source}\n`;
    } else if (b.type === 'table') {
      html += '<table>';
      b.data.content.forEach(c => {
        html += '<tr>';
        c.forEach(t => {
          html += `<th>${t}</th>`;
        });
        html += '</tr>';
      });
      html += '</table>\n';
    }
  });
  return html;
};

export default json2Html;
