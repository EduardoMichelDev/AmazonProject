class Car {
  #brand;
  #model;
  speed;
  isTrunkOpen;

  constructor(carProperties) {
    this.#brand = carProperties.brand;
    this.#model = carProperties.model;
    this.speed = 0;
    this.isTrunkOpen = false;
  }

  displayInfo() {
    console.log(
      `${this.#brand}, ${this.#model}, ${this.speed} Km/h, Trunk status: ${this.isTrunkOpen}`
    );
  }

  go() {
    if (this.speed <= 200) {
      this.speed += 5;
    }
  }

  brake() {
    if (this.speed >= 5) {
      this.speed -= 5;
    }
  }

  openTrunk() {
    if (this.speed === 0 && this.isTrunkOpen === false) {
      this.isTrunkOpen = true;
    }
  }

  closeTrunk() {
    if (this.isTrunkOpen) {
      this.isTrunkOpen = false;
    }
  }
}

const car1 = new Car({
  brand: "Toyota",
  model: "Corolla",
});
const car2 = new Car({
  brand: "Tesla",
  model: "Model 3",
});
console.log(car1, car2);

car1.go();
car1.go();
car1.go();
car1.brake();

car2.brake();

car1.openTrunk();
car2.openTrunk();

car1.displayInfo();
car2.displayInfo();

class RaceCar extends Car {
  acceleration;

  constructor(carProperties) {
    super(carProperties);
    this.acceleration = carProperties.acceleration || 0;
  }

  displayInfo() {
    console.log(
      `Brand: ${this.brand}, Model: ${this.model}, Acceleration: ${this.acceleration}, Speed: ${this.speed} Km/h, Trunk status: ${this.isTrunkOpen}`
    );
  }

  go() {
    if (this.speed <= 300) {
      this.speed += this.acceleration;
    }
  }
  openTrunk() {
    this.isTrunkOpen = "No applies";
  }
  closeTrunk() {
    this.isTrunkOpen = "No applies";
  }
}

const car3 = new RaceCar({
  brand: "McLaren",
  model: "F1",
  acceleration: 20,
});

car3.go();
car3.go()
car3.displayInfo();
