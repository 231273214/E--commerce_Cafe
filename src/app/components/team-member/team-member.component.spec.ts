import { Component, input } from '@angular/core';

@Component({
  selector: 'app-team-member',
  imports: [],
  templateUrl: './team-member.component.html',
  styleUrl: './team-member.component.scss'
})
export class TeamMemberComponent {
  name = input.required<string>();
  photo = input.required<string>();
  description = input.required<string>();
}