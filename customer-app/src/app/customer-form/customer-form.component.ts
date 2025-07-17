import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html'
})
export class CustomerFormComponent implements OnInit {
  customerId: number | null = null;
  customerNumber!: number;
  customerName: string | undefined;
  dateOfBirth!: string; // ISO string
  gender: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.customerId = id;
      this.customerService.getCustomerById(id).subscribe({
        next: (data) => {
          this.customerNumber = data.customerNumber;
          this.customerName = data.customerName;
          this.dateOfBirth = new Date(data.dateOfBirth).toISOString().substring(0, 10);
          this.gender = data.gender;
        },
        error: (err) => {
          alert('Error loading customer: ' + err.error);
        }
      });
    }
  }

  submit() {
    const customer = {
      CustomerNumber: this.customerNumber,
      CustomerName: this.customerName,
      DateOfBirth: this.dateOfBirth ? new Date(this.dateOfBirth) : null,
      Gender: this.gender
    };

    const callback = () => this.router.navigate(['/customer-list']);

    if (this.customerId) {
      this.customerService.updateCustomer(this.customerId, customer).subscribe(
        res => {
          alert('Customer updated successfully!');
          callback();
        },
        err => alert('Update error: ' + err.error)
      );
    } else {
      this.customerService.addCustomer(customer).subscribe(
        res => {
          alert('Customer added successfully!');
          callback();
        },
        err => alert('Add error: ' + err.error)
      );
    }
  }
}
