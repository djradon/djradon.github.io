function stripFrontmatter(markdown) {
  return markdown.replace(/^-{3}[\s\S]*?-{3}/, ''); // Regex to remove frontmatter
}

function fetchInto(URL, elementID) {
  fetch(URL)
    .then(response => response.text())
    .then(markdown => {
    const cleanedMarkdown = stripFrontmatter(markdown);
      document.getElementById(elementID).innerHTML = marked.parse(cleanedMarkdown);
    });
}
