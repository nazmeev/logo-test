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
  logoId: string
  logoForm: FormGroup
  btnName: string
  formTitle: string
  fontsList: {}

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
    this.setTemplateVariables()
    this.getLogo()
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

  getLogo() {
    this.dbService.getDataById(this.logoId, 'logos').subscribe(
      resp => {
        if (resp) {
          this.logoForm.controls['text'].setValue(resp.text)
          this.logoForm.controls['figure'].setValue(resp.figure)
          this.logoForm.controls['font'].setValue(resp.font)
        }
      }
    )
  }
  saveLogo() {
    if (this.logoForm.status == "VALID") {
      const saveData = this.logoForm.value as { text, figure, font }
      this.logoId ? this.updateLogo(saveData) : this.createLogo(saveData)
    }
  }

  updateLogo(data: Logo) {
    this.dbService.updateData(this.logoId, data, 'logos').then(
      () => this.redirectAlert('Updated', 'alert-success')
    )
  }
  createLogo(data: Logo) {
    this.dbService.createData('id', data, 'logos').then(
      resp => {
        this.dbService.updateData(resp['id'], resp, 'logos').then(
          () => this.redirectAlert('Saved', 'alert-success')
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

  redirectAlert(alertText, alertType) {
    const navigationExtras: NavigationExtras = { state: { data: alertText, type: alertType } }
    this.router.navigate(['/'], navigationExtras)
  }
}
