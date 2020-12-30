import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Logo } from '../../../interfaces/logo.interface';
import { DbService } from '../../../services/db.service';
import { FontsLink } from '../../../shared/enum/fontslink.enum';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html'
})
export class LogoComponent implements OnInit {
  logoId: string
  logoForm: FormGroup
  btnName: string
  formTitle: string
  fontsList: {}
  figures: any
  loaded: boolean = false

  constructor(
    private router: Router,
    private dbService: DbService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.initForm()
    this.getLogoId()
    this.getFontsList()
    this.setTemplateVariables()
  }

  ngOnInit(): void {
    this.loadData()
  }

  initForm() {
    this.logoForm = this.formBuilder.group({
      text: ['', [Validators.required, Validators.maxLength(50)]],
      figure: ['', [Validators.required]],
      font: ['', [Validators.required]]
    })
  }
  get text() {
    return this.logoForm.get('text')
  }
  get figure() {
    return this.logoForm.get('figure')
  }
  get font() {
    return this.logoForm.get('font')
  }

  getLogoId() {
    this.route.params.subscribe(params => {
      this.logoId = params.id
    })
  }
  loadData() {
    this.dbService.getDataById(this.logoId, 'logos').pipe(
      switchMap((logo: Logo) => {
        if (logo) this.setFormValues(logo)
        return this.dbService.getAllData('figures')
      }),
      switchMap((figures: any) => {
        this.figures = figures
        return of(true)
      })
    ).subscribe((loaded: boolean) => {
      this.loaded = loaded
    })
  }
  saveLogo() {
    if (this.logoForm.status == "VALID") {
      const saveData = this.logoForm.value as { text, figure, font }
      this.logoId ? this.updateLogo(saveData) : this.createLogo(saveData)
    }
  }

  updateLogo(data: Logo) {
    this.dbService.updateData(this.logoId, data, 'logos').then(
      () => this.redirectAlertVariables('Updated', 'alert-success')
    )
  }
  createLogo(data: Logo) {
    this.dbService.createData('id', data, 'logos').then(
      resp => {
        this.dbService.updateData(resp['id'], resp, 'logos').then(
          () => this.redirectAlertVariables('Saved', 'alert-success')
        )
      }
    )
  }

  setTemplateVariables() {
    if (this.logoId) {
      this.btnName = 'Update'
      this.formTitle = 'Change logo'
    } else {
      this.btnName = 'Create'
      this.formTitle = 'Create new logo'
    }
  }

  redirectAlertVariables(alertText, alertType) {
    const navigationExtras: NavigationExtras = { state: { data: alertText, type: alertType } }
    this.router.navigate(['/'], navigationExtras)
  }

  getFontsList() {
    this.fontsList = Object.keys(FontsLink)
  }
  setFormValues(logo) {
    this.logoForm.controls['text'].setValue(logo.text)
    this.logoForm.controls['figure'].setValue(logo.figure)
    this.logoForm.controls['font'].setValue(logo.font)
  }
}
