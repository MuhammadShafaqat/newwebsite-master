import { Component, OnInit } from '@angular/core';
import { Article } from '../_models/article';
import { ArticlesService } from '../services/articles.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [FormsModule, CommonModule, MatIconModule],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss'
})
export class ArticleListComponent implements OnInit{

    searchTerm = '';
  articles: Article[] = [];

  constructor(private articleService: ArticlesService, private router: Router) {  }

  ngOnInit(): void {
  this.articleService.getArticles().subscribe({
    next: (data) => this.articles = data,
    error: (err) => console.error('Error fetching articles:', err)
  });
}

  get filteredArticles(): Article[] {
    return this.articles.filter(article =>
      article.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      article.body.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

openArticle(id: string) {
  if (typeof id === 'string') {
    this.router.navigate(['/article', id]);
  } else {
    console.error('Invalid article ID in openArticle()', id);
  }
}


convertToParagraphs(text: string): string {
  if (!text) return '';

  // Escape basic HTML entities
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Detect and convert URLs to anchor tags
  const urlRegex = /((https?:\/\/|www\.)[^\s<]+)/g;
  const linkedText = escaped.replace(urlRegex, (match) => {
    const href = match.startsWith('http') ? match : `https://${match}`;
    return `<a href="${href}" target="_blank" rel="noopener noreferrer">${match}</a>`;
  });

  // Convert double line breaks into paragraphs, single line breaks into <br>
  const paragraphs = linkedText.split(/\n{2,}/g);
  return paragraphs
    .map(p => `<p>${p.trim().replace(/\n/g, '<br>')}</p>`)
    .join('');
}




// convertToParagraphs(text: string): string {
//   if (!text) return '';

//   const escaped = text
//     .replace(/&/g, '&amp;')
//     .replace(/</g, '&lt;')
//     .replace(/>/g, '&gt;');

//   const paragraphs = escaped.split(/\n{2,}/g); // double line breaks → paragraphs

//   return paragraphs
//     .map(para => `<p>${para.trim().replace(/\n/g, '<br>')}</p>`)
//     .join('');
// }


}
