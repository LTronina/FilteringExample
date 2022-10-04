import { Component, Input, OnInit } from '@angular/core';
import { GetCustomerDto } from '../ef-clients.interfaces';

@Component({
  selector: 'ef-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss'],
})
export class ClientsListComponent implements OnInit {
  @Input() items: GetCustomerDto[] = [];
  constructor() {}

  ngOnInit(): void {}
}
