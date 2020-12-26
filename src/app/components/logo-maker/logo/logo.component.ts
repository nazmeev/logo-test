import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Logo } from '../../../interfaces/logo.interface';
import { DbService } from '../../../services/db.service';
import { FontsLink } from '../../../shared/enum/fontslink.enum';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html'
})
export class LogoComponent implements OnInit {
  logo: Logo
  logoId: string
  logoForm: FormGroup
  btnName: string
  formTitle: string
  fontsList

  constructor(
    private router: Router,
    private dbService: DbService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.logoForm = this.formBuilder.group({
      text: ['', [Validators.required, Validators.maxLength(50)]],
      figure: ['', [Validators.required]],
      font: ['', [Validators.required]]
    })
    this.route.params.subscribe(params => {
      this.logoId = params.id
    })
    this.fontsList = Object.keys(FontsLink)
  }

  ngOnInit(): void {
    if (this.logoId) {
      this.getLogo()
      this.btnName = 'Update'
      this.formTitle = 'Change logo'
    } else {
      this.btnName = 'Create'
      this.formTitle = 'Create new logo'
    }
  }

  get text() {
    return this.logoForm.get('text');
  }
  get figure() {
    return this.logoForm.get('figure');
  }
  get font() {
    return this.logoForm.get('font');
  }

  getLogo() {
    this.dbService.getDataById(this.logoId, 'logos').subscribe(
      resp => {
        this.logo = resp
        this.logoForm.controls['text'].setValue(this.logo.text)
        this.logoForm.controls['figure'].setValue(this.logo.figure)
        this.logoForm.controls['font'].setValue(this.logo.font)
      }
    )
  }
  saveLogo() {
    if (this.logoForm.status == "VALID") {
      this.logoId ? this.updateLogo(this.logoForm.value) : this.createLogo(this.logoForm.value)
    }
  }

  updateLogo(values) {
    const { text, figure, font } = values
    this.dbService.updateData(this.logoId, { text, figure, font }, 'logos').then(
      () => {
        const navigationExtras: NavigationExtras = { state: { data: 'Updated', type: 'alert-success' } }
        this.router.navigate(['/'], navigationExtras)
      }
    )
  }
  createLogo(values) {
    const { text, figure, font } = values
    this.dbService.createData('id', { text, figure, font }, 'logos').then(
      resp => {
        this.dbService.updateData(resp['id'], resp, 'logos').then(
          () => {
            const navigationExtras: NavigationExtras = { state: { data: 'Saved', type: 'alert-success' } }
            this.router.navigate(['/'], navigationExtras)
          }
        )
      }
    )
  }
}
