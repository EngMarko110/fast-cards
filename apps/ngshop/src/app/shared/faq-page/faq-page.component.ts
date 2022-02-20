import { Question } from "./../models/questions";
import { Component, OnInit } from "@angular/core";
// import{Answer,Question} from './modles/question.ts'
@Component({
  selector: "bluebits-faq-page",
  templateUrl: "./faq-page.component.html",
  styleUrls: ["./faq-page.component.scss"],
})
export class FaqPageComponent implements OnInit {
  questions: Question[] = [
    {
      id: "1",
      value: "question 1",
    },
    {
      id: "2",
      value: "question 2",
    },
    {
      id: "3",
      value: "question 3",
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
