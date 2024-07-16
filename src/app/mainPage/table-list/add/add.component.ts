import { Component } from '@angular/core';
import { IlService } from '../../services/il.service';
import { IlceService } from '../../services/ilce.service';
import { TasinmazService } from 'src/app/tasinmaz.service';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms'
import { Tasinmaz } from 'src/app/models/tasinmaz';
import { Il } from 'src/app/models/il';
import { Ilce } from 'src/app/models/ilce';
import { Mahalle } from 'src/app/models/mahalle';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers:[TasinmazService]
})
export class AddComponent {
  
  newTasinmaz: Tasinmaz = new Tasinmaz();
  mahalleler: Mahalle[] = [];
  iller: Il[] = [];
  ilceler: Ilce[] = [];
  selectedIl: number;
  tasinmazForm: FormGroup;

  createTasinmazForm(){
    this.tasinmazForm = this.formBuilder.group({
      il: ['', Validators.required],
      ilce: ['', Validators.required],
      mahalleId: ['', Validators.required],
      ada: ['', Validators.required],
      parsel: ['', Validators.required],
      nitelik: ['', Validators.required],
      adres: ['', Validators.required],
      koordinatBilgileri: ['', Validators.required],
      
    })
  }

  constructor( private ilService: IlService, private ilceService: IlceService, private tasinmazService:TasinmazService, private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.loadIller();
    this.createTasinmazForm();
  }

  loadIller(){
    this.ilService.getIller().subscribe((data) => {
      this.iller = data;
      //sort the iller by alphabetical order
    }, (error) => {
      console.error('İller yüklenirken hata oluştu', error);
    });
  }

  onIlChange(ilId: number): void {
    this.selectedIl = ilId;
    this.loadIlceler(ilId);
  }

  loadIlceler(ilId: number): void {
    this.ilceService.getIlcelerByIlId(ilId).subscribe(data => {
      this.ilceler = data;
    }, error => {
      console.error('İlçeler yüklenirken hata oluştu', error);
    });
  }

  add(){
    if(this.tasinmazForm.valid){
      this.newTasinmaz  = Object.assign({},this.tasinmazForm.value)

    }
  }
}