import User from "../common/Classes/User";
import PageController from "../common/Interfaces/PageController";
import { PaymentMethod, TransactionType } from "../common/Classes/Transaction";

export default class FormPageController implements PageController {

    public run(user: User): void {
        const form = document.getElementById('paymentForm') as HTMLFormElement;
        const transactionPeriodSelect = document.getElementById('transactionPeriod') as HTMLSelectElement;

        transactionPeriodSelect.value = 'once';

        form.addEventListener('submit', (event) => this.handleSubmit(event));
        transactionPeriodSelect.addEventListener('change', () => this.handleTransactionPeriodChange());
    }

    handleTransactionPeriodChange() {
        const transactionPeriodSelect = document.getElementById('transactionPeriod') as HTMLSelectElement;
        const dateFields = document.getElementById('dateFields') as HTMLElement;
        const periodicFields = document.getElementById('periodicFields') as HTMLElement;

        if (transactionPeriodSelect.value === 'once') {
            dateFields.style.display = 'block';
            periodicFields.style.display = 'none';
        } else if (transactionPeriodSelect.value === 'periodic') {
            dateFields.style.display = 'none';
            periodicFields.style.display = 'block';
        } else {
            dateFields.style.display = 'none';
            periodicFields.style.display = 'none';
        }
    }

    handleSubmit(event: Event) {
        event.preventDefault();

        const transactionPeriodSelect = document.getElementById('transactionPeriod') as HTMLSelectElement;
        const nameInput = document.getElementById('name') as HTMLInputElement;
        const typeSelect = document.getElementById('type') as HTMLSelectElement;
        const paymentSelect = document.getElementById('paymentMethod') as HTMLSelectElement;
        const creationDateInput = document.getElementById('creationDate') as HTMLInputElement;
        const amountInput = document.getElementById('amount') as HTMLInputElement;
        const categoryInput = document.getElementById('category') as HTMLInputElement;
        const descriptionInput = document.getElementById('description') as HTMLInputElement;
        const sourceInput = document.getElementById('source') as HTMLInputElement;
        const destinationInput = document.getElementById('destination') as HTMLInputElement;
        const endedCheckbox = document.getElementById('ended') as HTMLInputElement;


        const transaction: any = {
            name: nameInput.value,
            type: typeSelect.value as TransactionType,
            paymentMethod: paymentSelect.value as PaymentMethod,
            creationDate: creationDateInput.valueAsNumber,
            amount: parseFloat(amountInput.value),
            category: categoryInput.value.split(','),
            description: descriptionInput.value,
            source: sourceInput.value,
            destination: destinationInput.value,
            ended: endedCheckbox.checked
        };


        if (transactionPeriodSelect.value === 'once') {
            const dateInput = document.getElementById('date') as HTMLInputElement;
            transaction.date = dateInput.valueAsNumber;
        } else if (transactionPeriodSelect.value === 'periodic') {
            const startDateInput = document.getElementById('startDate') as HTMLInputElement;
            const intervalInput = document.getElementById('interval') as HTMLInputElement;
            const executionLimitInput = document.getElementById('executionLimit') as HTMLInputElement;
            const numberOfExecutionsInput = document.getElementById('numberOfExecutions') as HTMLInputElement;
            const lastExecutionDateInput = document.getElementById('lastExecutionDate') as HTMLInputElement;

            transaction.startDate = startDateInput.valueAsNumber;
            transaction.interval = parseInt(intervalInput.value);
            transaction.executionLimit = parseInt(executionLimitInput.value);
            transaction.numberOfExecutions = parseInt(numberOfExecutionsInput.value);
            transaction.lastExecutionDate = lastExecutionDateInput.valueAsNumber;
        }

        console.log(transaction);

        // Reset form fields after submission
        (document.getElementById('paymentForm') as HTMLFormElement).reset();
        this.handleTransactionPeriodChange(); // To reset visibility of fields
    }
}