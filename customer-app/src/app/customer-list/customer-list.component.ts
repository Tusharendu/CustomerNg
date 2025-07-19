import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
    styleUrls: ['./customer-list.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class CustomerListComponent implements OnInit {
  customers: any[] = [];

  constructor(private customerService: CustomerService, private router: Router, private authService: AuthService) {}

  // Handle "Add Customer" button click
  addCustomer() {
    // Logic to open a form or navigate to an add page    
    this.router.navigate(['/customer-form']);
  }
isAdmin(): boolean {
  return this.authService.isAdmin();
}
  ngOnInit(): void {
    this.customerService.getAllCustomers().subscribe({
      next: (data) => this.customers = data,
      error: (err) => alert('Error loading customers: ' + err.error)
    });
  }

  editCustomer(id: number): void {
    this.router.navigate(['/customer-form', id]);
  }

  searchTerm: string = '';

deleteCustomer(id: number): void {
  if (confirm('Are you sure you want to delete this customer?')) {
    this.customerService.deleteCustomer(id).subscribe({
      next: () => {
        this.customers = this.customers.filter(c => c.id !== id);
        alert('Customer deleted successfully!');
      },
      error: (err) => alert('Delete error: ' + err.error)
    });
  }
}

get filteredCustomers(): any[] {
  const term = this.searchTerm.toLowerCase();
  return this.customers.filter(c =>
    c.customerName.toLowerCase().includes(term) ||
    c.customerNumber.toString().includes(term)
  );
}

}
