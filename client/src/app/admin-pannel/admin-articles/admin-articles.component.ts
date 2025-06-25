import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ArticlesService } from '../admin-services/articles.service';

@Component({
  selector: 'app-admin-articles',
  templateUrl: './admin-articles.component.html',
  styleUrls: ['./admin-articles.component.scss'],
})
export class AdminArticlesComponent implements OnInit, AfterViewInit {
  articleForm: FormGroup;
  selectedFile: File | null = null;
  articles: any[] = [];
  editingArticleId: string | null = null;

  @ViewChild('bodyTextarea') bodyTextareaRef!: ElementRef<HTMLTextAreaElement>;

  constructor(private fb: FormBuilder, private article: ArticlesService) {
    this.articleForm = this.fb.group({
      title: [''],
      body: [''],
    });
  }

  ngOnInit() {
    this.loadArticles();
  }

  ngAfterViewInit(): void {
    // Initial grow (if editing article and content exists)
    setTimeout(() => this.autoGrowTextarea(), 100);
  }

  loadArticles() {
    this.article.getArticles().subscribe((res) => {
      this.articles = res;
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.articleForm.get('title')?.value);
    formData.append('body', this.articleForm.get('body')?.value);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.editingArticleId) {
      this.article.updateArticle(this.editingArticleId, formData).subscribe({
        next: () => {
          alert('Article updated!');
          this.resetForm();
        },
        error: (err) => console.error('Update error:', err),
      });
      return;
    }

    this.article.createArticle(formData).subscribe({
      next: () => {
        alert('Article created!');
        this.resetForm();
      },
      error: (err) => console.error(err),
    });
  }

  onEdit(article: any) {
    this.editingArticleId = article.id;
    this.articleForm.patchValue({
      title: article.title,
      body: article.body,
    });

    setTimeout(() => this.autoGrowTextarea(), 50);
  }

  onDelete(id: string) {
    if (confirm('Are you sure you want to delete this article?')) {
      this.article.deleteArticle(id).subscribe(() => {
        this.articles = this.articles.filter((a) => a.id !== id);
      });
    }
  }

  cancelEdit() {
    this.editingArticleId = null;
    this.resetForm();
  }

  resetForm() {
    this.articleForm.reset();
    this.selectedFile = null;
    this.editingArticleId = null;
    this.resetTextareaHeight();
    this.loadArticles();
  }

  getCurrentArticle() {
    return this.articles.find((a) => a.id === this.editingArticleId);
  }

  autoGrow(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  autoGrowTextarea() {
    if (this.bodyTextareaRef) {
      const textarea = this.bodyTextareaRef.nativeElement;
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }

  resetTextareaHeight() {
    if (this.bodyTextareaRef) {
      const textarea = this.bodyTextareaRef.nativeElement;
      textarea.style.height = '120px'; // or whatever your default min-height is
    }
  }
}
