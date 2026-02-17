
document.addEventListener('DOMContentLoaded', function () {
  // Service Pricing Array
  const services = [
    { name: "Interior Cleaning", value: "basic", rate: 75 },
    { name: "Exterior Cleaning", value: "deep", rate: 100 },
    { name: "Long Distance Cleaning", value: "move", rate: 350 },
    { name: "Full car Cleaning", value: "garage", rate: 150 }
    
  ];
const pricingList = document.querySelector('#pricing_list ul');
if (pricingList) {
  pricingList.innerHTML = ''; // Clear any existing content
  services.forEach(service => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${service.name}:</strong> $${service.rate} per visit`;
    pricingList.appendChild(li);
  });
}

  // Quote Form Field Array
  const quoteFormFields = [
    {
      type: "select",
      label: "Service Type:",
      id: "serviceType",
      required: true,
      options: [
        { value: "", text: "-- Select a Service --" },
        ...services
          .filter(s => s.value !== "windows")
          .map(s => ({ value: s.value, text: s.name }))
      ]
    },
    { type: "number", label: "Number of cars:", id: "visits", min: 1, placeholder: "e.g. 1" },
    { type: "number", label: "Distance (miles):", id: "windows", min: 0, placeholder: "e.g. 5" }
  ];

  // Render Quote Form
  const calculatorSection = document.querySelector('.calculator');
  if (calculatorSection) {
    const form = document.createElement('form');
    form.id = "quoteForm";

    quoteFormFields.forEach(field => {
      const label = document.createElement('label');
      label.setAttribute('for', field.id);
      label.textContent = field.label;
      form.appendChild(label);

      let input;
      if (field.type === "select") {
        input = document.createElement("select");
        input.id = field.id;
        if (field.required) input.required = true;

        field.options.forEach(opt => {
          const option = document.createElement("option");
          option.value = opt.value;
          option.textContent = opt.text;
          input.appendChild(option);
        });
      } else {
        input = document.createElement("input");
        input.type = field.type;
        input.id = field.id;
        input.min = field.min;
        input.placeholder = field.placeholder;
      }

      form.appendChild(input);
    });

    const button = document.createElement("button");
    button.type = "submit";
    button.textContent = "Get Your Price!";
    form.appendChild(button);

    calculatorSection.appendChild(form);

    const resultDiv = document.createElement("div");
    resultDiv.id = "quoteResult";
    resultDiv.setAttribute("aria-live", "polite");
    calculatorSection.appendChild(resultDiv);
  }

  // Quote Calculator Logic
  const quoteForm = document.getElementById('quoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const serviceType = document.getElementById('serviceType').value;
      if (!serviceType) {
        alert("Please select a service type.");
        return;
      }

      const visits = parseInt(document.getElementById('visits').value, 10) || 0;
      const windows = parseInt(document.getElementById('windows').value, 10) || 0;
      const garage = parseInt(document.getElementById('garage').value, 10) || 0;
      const large = parseInt(document.getElementById('largeRoom').value, 10) || 0;
      const small = parseInt(document.getElementById('smallRoom').value, 10) || 0;

      const baseRate = services.find(s => s.value === serviceType)?.rate || 0;
      const windowRate = services.find(s => s.value === "windows").rate;
      const garageRate = serviceType === "garage" ? 0 : services.find(s => s.value === "garage").rate;
      const largeRate = serviceType === "largeRoom" ? 0 : services.find(s => s.value === "largeRoom").rate;
      const smallRate = serviceType === "smallRoom" ? 0 : services.find(s => s.value === "smallRoom").rate;

      const total =
        (baseRate * visits) +
        (windowRate * windows) +
        (garageRate * garage) +
        (largeRate * large) +
        (smallRate * small);

      document.getElementById('quoteResult').textContent = `Estimated Quote: $${total.toFixed(2)}`;
    });
  }
});
