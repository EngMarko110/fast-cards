import { Component, Input, OnInit } from '@angular/core';
import { Answer } from '../../models/questions';

@Component({
  selector: 'bluebits-answering',
  templateUrl: './answering.component.html',
  styleUrls: ['./answering.component.scss']
})
export class AnsweringComponent implements OnInit {
@Input() questionId;
answers:Answer[]=[];
answersList: Answer[] = [
  {
    id: '1',
    questionId: '1',
    value: 'value 1'
  },
  {
    id: '2',
    questionId: '1',
    value: 'value 2'
  },
  {
    id: '2',
    questionId: '2',
    value: 'value 2'
  },
  {
    id: '3',
    questionId: '3',
    value: 'value 3'
  },
];
  constructor() { 
  }
  ngOnInit(): void {
   this.answersList.filter((ele)=>{
     if(ele.questionId===this.questionId)
     this.answers.push(ele);
    })
  }

}
