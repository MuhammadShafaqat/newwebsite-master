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

  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const paragraphs = escaped.split(/\n{2,}/g); // double line breaks → paragraphs

  return paragraphs
    .map(para => `<p>${para.trim().replace(/\n/g, '<br>')}</p>`)
    .join('');
}



  }


