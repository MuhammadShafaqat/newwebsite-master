import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { AdminpressService } from '../admin-services/adminpress.service';
import { PressRelease } from '../../_models/press';
declare var require: any;
const html2pdf = require('html2pdf.js');

@Component({
  selector: 'app-admin-press',
  templateUrl: './admin-press.component.html',
  styleUrls: ['./admin-press.component.scss']
})
export class AdminPressComponent implements OnInit {
  title = '';
  content = '';
  email = '';
  pressReleases: PressRelease[] = [];
  selectedRelease: PressRelease | null = null;

  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;

  constructor(private pressService: AdminpressService) {}

  ngOnInit(): void {
    this.loadPressReleases();
  }

  get contentWithBreaks(): string {
    return this.content.replace(/\n/g, '<br>');
  }

  submit() {
    if (!this.title || !this.content) {
      alert('Please fill in all required fields.');
      return;
    }

    const body = { title: this.title, content: this.contentWithBreaks };
    this.pressService.createRelease(body).subscribe(() => {
      alert('✅ Press release saved.');
      this.loadPressReleases();
      this.title = '';
      this.content = '';
    });
  }

  loadPressReleases() {
    this.pressService.getAllReleases().subscribe(data => this.pressReleases = data);
  }

  openEmailDialog(release: PressRelease) {
    this.selectedRelease = release;
    this.email = '';
  }

  cancelSend() {
    this.selectedRelease = null;
  }

  async confirmSend() {
    if (!this.email || !this.selectedRelease) return;

    const release = this.selectedRelease;

    const leftFlag = '../../../assets/logo/starlinelessbiggertransparent.png';
    const rightFlag = '../../../assets/logo/starlinelessbiggertransparent.png';
    const releaseDate = new Date(release.date).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });

    const calendarIconSVG = `
      <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18" fill="#666" style="margin-right: 6px;">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M19 4h-1V2h-2v2H8V2H6v2H5
                 c-1.1 0-2 .9-2 2v14a2 2 0 002 2h14
                 a2 2 0 002-2V6c0-1.1-.9-2-2-2zm0
                 16H5V9h14v11zm0-13H5V6h14v1z"/>
      </svg>
    `;

 const contentHtml = `
  <div style="
    max-width: 900px;
    margin: auto;
    padding: 40px;
    font-family: 'Georgia', serif;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    line-height: 1.8;
    color: #222;
    text-align: justify;
  ">
    <div style="
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 30px;
      margin-bottom: 30px;
    ">
      <img src="${leftFlag}" style="height: 50px;" crossOrigin="anonymous"/>
      <h1 style="
        margin: 0;
        font-size: 1.5rem;
        font-weight: 500;
        text-align: center;
        color: #2c3e50;
      ">${release.title}</h1>
      <img src="${rightFlag}" style="height: 50px;" crossOrigin="anonymous"/>
    </div>

    <hr style="border: none; border-top: 2px solid #aaa; margin: 20px 0;" />

    <div style="font-size: 1rem; margin-bottom: 30px;">
      ${release.content}
    </div>

    <div style="
      display: flex;
      align-items: center;
      font-size: 0.95rem;
      color: #555;
      font-style: italic;
      border-left: 4px solid #ccc;
      padding-left: 8px;
      max-width: 300px;
    ">
      ${calendarIconSVG}<span>${releaseDate}</span>
    </div>
  </div>
`;


    const container = document.createElement('div');
    container.innerHTML = contentHtml;
    document.body.appendChild(container);

    const opt = {
      margin: 0,
      filename: 'press-release.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        allowTaint: true
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    const pdfBlob: Blob = await html2pdf().set(opt).from(container).outputPdf('blob');
    document.body.removeChild(container);

    const reader = new FileReader();
    reader.readAsDataURL(pdfBlob);
    reader.onloadend = () => {
      const base64 = reader.result?.toString().split(',')[1];

      // ✅ Ensure it's defined before sending
      if (!base64) {
        alert('❌ Failed to generate PDF content.');
        return;
      }

      this.pressService.sendRelease(release._id!, {
        email: this.email,
        pdfBase64: base64,
      }).subscribe(() => {
        alert('✅ Email sent with PDF.');
        this.selectedRelease = null;
        this.email = '';
      });
    };
  }

autoGrowTextArea(element: HTMLTextAreaElement) {
  element.style.height = 'auto';
  element.style.height = element.scrollHeight + 'px';
}


}
