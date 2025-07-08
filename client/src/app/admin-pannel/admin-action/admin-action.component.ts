import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Action } from 'src/app/_models/action';
import { AdminactionService } from '../admin-services/adminaction.service';

@Component({
  selector: 'app-admin-action',
  templateUrl: './admin-action.component.html',
  styleUrls: ['./admin-action.component.scss']
})
export class AdminActionComponent implements OnInit {
  actions: Action[] = [];
  actionForm!: FormGroup;
  isEditing = false;
  selectedId: string | null = null;
  selectedImages: File[] = [];
  previewUrls: string[] = [];
  existingImages: string[] = [];

  constructor(private adminAction: AdminactionService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.loadActions();
  }

  get descriptions() {
    return this.actionForm.get('descriptions') as FormArray;
  }

  initForm() {
    this.actionForm = this.fb.group({
      title: ['', Validators.required],
      descriptions: this.fb.array([
        this.fb.control('', Validators.required)
      ]),
      images: [null]
    });
  }

  loadActions() {
    this.adminAction.getAllActions().subscribe(res => this.actions = res);
  }

  addDescription() {
    this.descriptions.push(this.fb.control('', Validators.required));
  }

  removeDescription(i: number) {
    this.descriptions.removeAt(i);
  }

  onImagesSelected(event: any) {
    const files: FileList = event.target.files;
    this.selectedImages = Array.from(files);
    this.previewUrls = [];

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = () => this.previewUrls.push(reader.result as string);
      reader.readAsDataURL(file);
    });
  }

  submitForm() {
    if (this.actionForm.invalid) return;

    const formData = new FormData();
    formData.append('title', this.actionForm.value.title);
    this.descriptions.value.forEach((desc: string) => formData.append('descriptions', desc));
    this.selectedImages.forEach(file => formData.append('images', file));

    const request = this.isEditing && this.selectedId
      ? this.adminAction.updateAction(this.selectedId, formData)
      : this.adminAction.createAction(formData);

    request.subscribe(() => {
      this.resetForm();
      this.loadActions();
    });
  }

  editAction(action: Action) {
    this.isEditing = true;
    this.selectedId = action._id || null;
    this.existingImages = action.images || [];

    this.actionForm.patchValue({ title: action.title });
    this.descriptions.clear();

    action.descriptions.forEach((desc, i) => {
      this.descriptions.push(this.fb.control(desc, Validators.required));
    });

    this.previewUrls = [...this.existingImages];
    this.selectedImages = [];
  }

  deleteAction(id: string) {
    if (confirm('Are you sure you want to delete this action?')) {
      this.adminAction.deleteAction(id).subscribe(() => this.loadActions());
    }
  }

  resetForm() {
    this.actionForm.reset();
    this.descriptions.clear();
    this.descriptions.push(this.fb.control('', Validators.required));
    this.isEditing = false;
    this.selectedId = null;
    this.previewUrls = [];
    this.selectedImages = [];
    this.existingImages = [];
  }
}
