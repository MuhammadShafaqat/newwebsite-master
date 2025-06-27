import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent { 

  supporters = [
    { image: '/assets/images/FrancescoL.png', name: 'Francesco L.' },
    { image: '/assets/images/ChristianB.png', name: 'Christian B.' },
    { image: '/assets/images/LeonK.png', name: 'Leon K.' },
    { image: '/assets/images/DusanD.png', name: 'Dusan D.' },
    { image: '/assets/images/JariG.png', name: 'Jane D.' },
    { image: '/assets/images/ThomasB.png', name: 'Tom L.' },
    { image: '/assets/images/StephanieBeere_Kreis.png', name: 'Mark T.' }
  ];

}


