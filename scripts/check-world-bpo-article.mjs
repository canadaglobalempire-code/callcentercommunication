import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const source = await readFile(new URL('../src/data/blogPosts.js', import.meta.url), 'utf8');
const { blogPosts } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
const article = blogPosts.find(post => post.slug === 'top-15-bpo-companies-in-the-world');
assert.equal(article.companies.length, 15);
assert.deepEqual(article.comparisonTable.rows.map(row => row.company), article.companies.map(company => company.name));
for (const name of ['Call Motivated Sellers', 'Customer Communications Corp', 'Contact Center USA', 'Call Center Communications', 'Business Process Outsourcing', 'B2B Telemarketing', 'Telemarketing Services', 'Teleperformance', 'Concentrix']) {
  const company = article.companies.find(item => item.name === name);
  const row = article.comparisonTable.rows.find(item => item.company === name);
  assert.ok(company.blurb.startsWith(name), `${name}: description belongs to a different company`);
  assert.equal(row.bestFor, company.bestFor, `${name}: table/profile service mismatch`);
  assert.equal(row.industries, company.industries, `${name}: table/profile industry mismatch`);
}
assert.match(article.content, /Ownership disclosure/);
assert.match(article.companies[2].blurb, /real estate investors/);
assert.match(article.companies[7].blurb, /brokerage/);
assert.doesNotMatch(article.companies[6].capabilities.join(' '), /Seller|Investor/);
if (process.argv[2]) {
  const url = new URL(`/blog/${article.slug}`, process.argv[2]);
  const response = await fetch(url);
  assert.equal(response.status, 200);
  const html = await response.text();
  for (const name of ['Call Motivated Sellers', 'Contact Center USA', 'Call Center Communications', 'B2B Telemarketing', 'Telemarketing Services']) {
    assert.ok(html.includes(article.companies.find(company => company.name === name).blurb), `${name}: rendered correction missing`);
  }
  assert.ok(html.includes('Ownership disclosure'));
  console.log(`Rendered article verified: ${url}`);
}
console.log('World BPO article: 15 companies retained; corrected profiles and comparison rows agree.');
