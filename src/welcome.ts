import { inject } from 'aurelia-framework';
import { GridConnector } from 'aurelia-v-grid';
import { DataSource } from 'aurelia-v-grid';
import { Selection } from 'aurelia-v-grid';
import { DummyDataGenerator } from './utils/dummyDataGenerator';

@inject(DummyDataGenerator)
export class Welcome {
  public heading = 'Welcome to the Aurelia Navigation App!';
  public firstName = 'John';
  public lastName = 'Doe';
  private previousValue = this.fullName;
  public ds: DataSource;
  public gridConnector: GridConnector;

  constructor(public dummyDataGenerator: DummyDataGenerator){
    this.dummyDataGenerator.generateData(10000, (data: any) => {
      this.myCollection = data;
    });
    this.ds = new DataSource(new Selection('multiple'));
    this.gridConnector = new GridConnector(this.ds);
    this.ds.setArray(this.myCollection);
  }

  // Getters can't be directly observed, so they must be dirty checked.
  // However, if you tell Aurelia the dependencies, it no longer needs to dirty check the property.
  // To optimize by declaring the properties that this getter is computed from, uncomment the line below
  // as well as the corresponding import above.
  // @computedFrom('firstName', 'lastName')
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  public submit() {
    this.previousValue = this.fullName;
    alert(`Welcome, ${this.fullName}!`);
  }

  public canDeactivate() {
    if (this.fullName !== this.previousValue) {
      return confirm('Are you sure you want to leave?');
    }
  }
}

export class UpperValueConverter {
  public toView(value) {
    return value && value.toUpperCase();
  }
}
