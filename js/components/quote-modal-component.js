// js/components/quote-modal-component.js
class QuoteModalComponent extends HTMLElement {
    constructor() {
        super();
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    connectedCallback() {
        this.innerHTML = `
            <div class="blackOverlay modal-overlay"></div>
            <div class="offer-modal quote-modal">
                <div class="modal-header">
                    <h2>Let's Talk About Your Project</h2>
                    <button class="close-x" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="quoteForm">

                        <div class="form-group">
                            <label for="contactName">Name *</label>
                            <input type="text" class="form-control" id="contactName" name="entry.1824552366" required>
                        </div>

                        <div class="form-group">
                            <label for="contactEmail">Email *</label>
                            <input type="email" class="form-control" id="contactEmail" name="entry.737815169" required>
                        </div>

                        <div class="form-group">
                            <label for="phoneNumber">Phone Number *</label>
                            <input type="tel" class="form-control" id="phoneNumber" name="entry.224751577" required>
                        </div>

                        <div class="form-group">
                            <label for="organization">Organization / Company</label>
                            <input type="text" class="form-control" id="organization" name="entry.223874730" placeholder="Optional">
                        </div>

                        <div class="form-group">
                            <label for="serviceType">Service Interested In *</label>
                            <select class="form-control" id="serviceType" name="entry.272279943" required>
                                <option value="">Choose a service</option>
                                <option value="eLearning Course">eLearning Course</option>
                                <option value="Custom eLearning Tool">Custom eLearning Tool</option>
                                <option value="eLearning Game">eLearning Game</option>
                                <option value="AI eLearning Solution">AI eLearning Solution</option>
                                <option value="Not Sure Yet — Let's Talk">Not Sure Yet — Let's Talk</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="whatYouTeach">What does your organization teach or train? *</label>
                            <textarea class="form-control" id="whatYouTeach" name="entry.407527672" rows="2"
                                placeholder="e.g. Sales onboarding, compliance training, software tutorials..." required></textarea>
                        </div>

                        <div class="form-group">
                            <label for="audienceSize">Who is your audience? *</label>
                            <select class="form-control" id="audienceSize" name="entry.1662305166" required>
                                <option value="">Choose</option>
                                <option value="Local / Regional">Local / Regional</option>
                                <option value="Statewide">Statewide</option>
                                <option value="Nationwide">Nationwide</option>
                                <option value="Global">Global</option>
                                <option value="Internal Employees Only">Internal Employees Only</option>
                                <option value="Not Sure Yet">Not Sure Yet</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="learnerCount">Estimated Learner Count *</label>
                            <select class="form-control" id="learnerCount" name="entry.695639740" required>
                                <option value="">Choose</option>
                                <option value="Under 50">Under 50</option>
                                <option value="50–500">50–500</option>
                                <option value="500–5,000">500–5,000</option>
                                <option value="5,000+">5,000+</option>
                                <option value="Not Sure">Not Sure</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="projectDetails">Tell me about your project *</label>
                            <textarea class="form-control" id="projectDetails" name="entry.524621042" rows="3"
                                placeholder="Brief description of what you're looking to build..." required></textarea>
                        </div>

                        <div class="form-group">
                            <label for="budget">Budget Range *</label>
                            <select class="form-control" id="budget" name="entry.1180439776" required>
                                <option value="">Choose</option>
                                <option value="Under $500">Under $500</option>
                                <option value="$500–$1,500">$500–$1,500</option>
                                <option value="$1,500–$5,000">$1,500–$5,000</option>
                                <option value="$5,000+">$5,000+</option>
                                <option value="Not Sure">Not Sure</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="contactMethod">Preferred Contact Method *</label>
                            <select class="form-control" id="contactMethod" name="entry.1356310225" required>
                                <option value="">Choose</option>
                                <option value="Email">Email</option>
                                <option value="Phone Call">Phone Call</option>
                                <option value="Video Call">Video Call</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="bestTime">Best Time to Reach You *</label>
                            <select class="form-control" id="bestTime" name="entry.2109712751" required>
                                <option value="">Choose</option>
                                <option value="Morning (8am–12pm)">Morning (8am–12pm)</option>
                                <option value="Afternoon (12pm–5pm)">Afternoon (12pm–5pm)</option>
                                <option value="Evening (5pm–8pm)">Evening (5pm–8pm)</option>
                            </select>
                        </div>

                        <div id="quoteFormStatus" class="form-status"></div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-submit" id="submitQuote">Submit Request</button>
                    <button type="button" class="btn-close">Close</button>
                </div>
            </div>
        `;

        const closeX = this.querySelector('.close-x');
        const closeBtn = this.querySelector('.btn-close');
        const submitBtn = this.querySelector('#submitQuote');
        const overlay = this.querySelector('.modal-overlay');

        closeX.addEventListener('click', this.closeModal);
        closeBtn.addEventListener('click', this.closeModal);
        overlay.addEventListener('click', this.closeModal);
        submitBtn.addEventListener('click', this.handleSubmit);

        document.addEventListener('openQuoteModal', () => {
            this.openModal();
        });
    }

    closeModal() {
        const modal = this.querySelector('.quote-modal');
        const overlay = this.querySelector('.modal-overlay');
        const form = this.querySelector('#quoteForm');
        const statusDiv = this.querySelector('#quoteFormStatus');

        modal.scrollTop = 0;
        modal.style.display = 'none';
        overlay.style.display = 'none';

        form.reset();
        statusDiv.textContent = '';
        statusDiv.className = 'form-status';
    }

    openModal() {
        const modal = this.querySelector('.quote-modal');
        const overlay = this.querySelector('.modal-overlay');

        overlay.style.display = 'block';
        modal.style.display = 'block';

        requestAnimationFrame(() => {
            overlay.style.opacity = '1';
            modal.style.opacity = '1';
            modal.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    }

    handleSubmit() {
        const form = this.querySelector('#quoteForm');

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const statusDiv = this.querySelector('#quoteFormStatus');
        const submitBtn = this.querySelector('#submitQuote');
        const formData = new FormData(form);

        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';

        const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSc4I4GZA8VQNfq8QCsIkXGlQn-OPD-qm38k6SSicaweZQuMzw/formResponse';

        fetch(googleFormUrl, {
            method: 'POST',
            body: formData,
            mode: 'no-cors'
        }).then(() => {
            statusDiv.className = 'form-status success';
            statusDiv.textContent = "Thank you! I'll be in touch soon to set up a time to talk.";

            form.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Request';

            setTimeout(() => {
                this.closeModal();
            }, 3000);
        }).catch(() => {
            statusDiv.className = 'form-status error';
            statusDiv.textContent = 'Something went wrong. Please try again or email me directly.';

            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Request';
        });
    }
}

customElements.define('quote-modal', QuoteModalComponent);