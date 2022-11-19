<div class="container projects-filters hidden py-5 mb-5">
    <div class="row">
        {{-- Markets Filter  --}}
        <div class="col-12 col-md-4 p-3 d-flex flex-column">
            {{-- Title --}}
            <small>Market</small>

            {{-- Select element --}}
            <div class="row no-gutters projects-filters__select-row">
                <div class="col-12 p-3 projects-filters__select markets-select collapsed">
                    <div class="row no-gutters">
                        <div class="col-11 dropdown-placeholder"></div>
                        <div class="col-1">

                            {{-- Expand arrow --}}
                            <svg class="bi bi-caret-down-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z"/>
                            </svg>

                            {{-- Collapse arrow --}}
                            <svg class="bi bi-caret-up-fill hidden" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z"/>
                            </svg>
                        </div>
                    </div>
                </div>
                {{-- Select options --}}
                <div class="row no-gutters projects-filters__options markets-options hidden">
                </div>
            </div>
        </div>


        <div class="col-12 col-md-4 p-3 d-flex flex-column">
            {{-- Title --}}
            <small>Capability</small>

            {{-- Select element --}}
            <div class="row no-gutters projects-filters__select-row">
                <div class="col-12 p-3 projects-filters__select capabilities-select collapsed">
                    <div class="row no-gutters">
                        <div class="col-11 dropdown-placeholder"></div>
                        <div class="col-1 col-md-1">

                            {{-- Expand arrow --}}
                            <svg class="bi bi-caret-down-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z"/>
                            </svg>

                            {{-- Collapse arrow --}}
                            <svg class="bi bi-caret-up-fill hidden" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z"/>
                            </svg>
                        </div>
                    </div>
                </div>
                {{-- Select options --}}
                <div class="row no-gutters projects-filters__options capabilities-options hidden">
                </div>
            </div>
        </div>
    </div>
  </div>