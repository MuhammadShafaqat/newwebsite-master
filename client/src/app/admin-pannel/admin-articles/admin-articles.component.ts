import { Component,  ElementRef,  OnInit,  ViewChild,  AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ArticlesService } from '../admin-services/articles.service';

@Component({
  selector: 'app-admin-articles',
  templateUrl: './admin-articles.component.html',
  styleUrls: ['./admin-articles.component.scss']
})
export class AdminArticlesComponent implements OnInit, AfterViewInit {
  articleForm: FormGroup;
  selectedFiles: File[] = [];
  articles: any[] = [];
  editingArticleId: string | null = null;

  selectedLanguage: string = 'en'; // default language

  @ViewChild('bodyTextarea') bodyTextareaRef!: ElementRef<HTMLTextAreaElement>;

  constructor(private fb: FormBuilder, private article: ArticlesService) {
    this.articleForm = this.fb.group({
      title: [''],
      body: [''],
      author: [''] // default author name
    });
  }

  ngOnInit(): void {
    this.loadArticles();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.autoGrowTextarea(), 100);
  }

  loadArticles(): void {
    this.article.getArticles().subscribe({
      next: (res) => this.articles = res,
      error: (err) => console.error('Load error:', err)
    });
  }

onFileSelected(event: any): void {
  const files = event.target.files;
  this.selectedFiles = [];

  if (files && files.length) {
    for (let i = 0; i < files.length; i++) {
      this.selectedFiles.push(files[i]);
    }
  }
}


  onSubmit(): void {
    const formData = new FormData();
    formData.append('title', this.articleForm.get('title')?.value);
    formData.append('body', this.articleForm.get('body')?.value);
    formData.append('author', this.articleForm.get('author')?.value);
  this.selectedFiles.forEach((file, index) => {
    formData.append('images', file); // 'images' should match backend field name
  });

    if (this.editingArticleId) {
      this.article.updateArticle(this.editingArticleId, formData).subscribe({
        next: () => {
          alert('Article updated!');
          this.resetForm();
        },
        error: (err) => console.error('Update error:', err)
      });
    } else {
      this.article.createArticle(formData).subscribe({
        next: () => {
          alert('Article created!');
          this.resetForm();
        },
        error: (err) => console.error('Create error:', err)
      });
    }
  }

  onEdit(article: any): void {
    this.editingArticleId = article.id;
    this.articleForm.patchValue({
      title: article.title,
      body: article.body,
      author: article.author || 'Redaktion der BKP'
    });

    setTimeout(() => this.autoGrowTextarea(), 50);
  }

  onDelete(id: string): void {
    if (confirm('Are you sure you want to delete this article?')) {
      this.article.deleteArticle(id).subscribe(() => {
        this.articles = this.articles.filter((a) => a.id !== id);
      });
    }
  }

  cancelEdit(): void {
    this.resetForm();
  }

  resetForm(): void {
    this.articleForm.reset();
    this.selectedFiles = [];
    this.editingArticleId = null;
    this.resetTextareaHeight();
    this.loadArticles();
  }

  getCurrentArticle(): any {
    return this.articles.find((a) => a.id === this.editingArticleId);
  }

  autoGrow(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  autoGrowTextarea(): void {
    if (this.bodyTextareaRef) {
      const textarea = this.bodyTextareaRef.nativeElement;
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }

  resetTextareaHeight(): void {
    if (this.bodyTextareaRef) {
      const textarea = this.bodyTextareaRef.nativeElement;
      textarea.style.height = '120px';
    }
  }

  getDirection(language: string): 'rtl' | 'ltr' {
    const rtlLanguages = ['ar', 'ur'];
    return rtlLanguages.includes(language) ? 'rtl' : 'ltr';
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
