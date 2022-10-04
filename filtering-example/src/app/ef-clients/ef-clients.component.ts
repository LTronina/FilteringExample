import { Component, Input, OnInit } from '@angular/core';
import { GetCustomerDto } from './ef-clients.interfaces';

@Component({
  selector: 'ef-clients',
  templateUrl: './ef-clients.component.html',
  styleUrls: ['./ef-clients.component.scss']
})
export class EfClientsComponent implements OnInit {


  clients:GetCustomerDto[]=[];

  constructor() { }

  ngOnInit(): void {
  }

}
