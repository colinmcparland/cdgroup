<div class="col-12 mb-3">
    <div class="join-our-team__form-header">
        Apply With Us
    </div>
</div>
@if (session('message'))
  <div class="col-12">
    {{ session('message') }}
  </div>
  @endif
  </div>
<div class="col-12 mb-3">
    <small>
        <em>Fields marked with * are required</em>
    </small>
</div>
<div class="col-12">
    <small>Name *</small>
</div>
<div class="col-12 mb-3">
    <input name="name" type="text" required  />
</div>
<div class="col-12">
    <small>Date of Birth *</small>
</div>
<div class="col-12 mb-3">
    <input name="birthday" type="date" required  />
</div>
<div class="col-12">
    <small>Year of Graduation B.A. *</small>
</div>
<div class="col-12 mb-3">
    <input required name="graduation-ba" type="number"  />
</div>
<div class="col-12">
    <small>Major BA *</small>
</div>
<div class="col-12 mb-3">
    <input required name="major-ba" type="text"  />
</div>
<div class="col-12">
    <small>Year of Graduation MA</small>
</div>
<div class="col-12 mb-3">
    <input name="graduation-ma" type="number"  />
</div>
<div class="col-12">
    <small>Major MA</small>
</div>
<div class="col-12 mb-3">
    <input name="major-ma" type="text"  />
</div>
<div class="col-md-12">
    <small>Residence Country *</small>
</div>
<div class="col-md-12 mb-3">
    <select required name="country" id="country">
        <option value="Palestine">Palestine</option>
        <option value="UAE">UAE</option>
        <option value="Jordan">Jordan</option>
    </select>
</div>
<div class="col-md-12">
    <small>Field of Expertise *</small>
</div>
<div class="col-md-12 mb-3">
    <select required name="expertise">
    </select>
</div>
<div class="col-md-12">
    <small>Specialization *</small>
</div>
<div class="col-md-12 mb-3">
    <select required  multiple name="specialization">
        <option value="Supervisor">Supervisor</option>
        <option value="Designer">Designer</option>
    </select>
</div>
<div class="col-md-12">
    <small>Upload CV (PDF Only) *</small>
</div>
<div class="col-md-12 mb-3">
    <input accept="application/pdf" type="file" required name="cv" />
</div>
<div class="col-md-12">
    <small>Upload Cover Letter (PDF Only)</small>
</div>
<div class="col-md-12 mb-3">
    <input accept="application/pdf" type="file" name="cover-letter" />
</div>
<div class="mb-3 g-recaptcha" name="g-recaptcha" data-sitekey="<?php echo getenv("RECAPTCHA_SITE_KEY"); ?>"></div>
<div class="col-12 mb-5">
    <input type="submit" />
</div>
