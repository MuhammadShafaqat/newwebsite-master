import { Component } from '@angular/core';
import { Article } from '../_models/article';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from '../services/articles.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent {

  article?: Article;

 
constructor(private route: ActivatedRoute, private articleService: ArticlesService) {
  const id = this.route.snapshot.paramMap.get('id');

  if (id) {
    this.articleService.getArticleById(id).subscribe({
      next: (data) => this.article = data,
      error: (err) => {
        console.error('Error fetching article:', err);
        alert('Article not found');
      }
    });
  } else {
    console.error('No article ID found in route');
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




  }


