import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Subscription } from 'rxjs';

import { CitationService } from '../../services/citation.service';
import { IMG_URL } from '../../../config';
const COVER_DURATION = 10000;

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, OnDestroy {
  private upSub: Subscription;
  citations: MemberCitation[];
  memberIdToCitation = null;
  memberIdToImage = IMG_URL;
  showUpdateCover = false;
  citationUpdated = [];

  numberPostfix = [ 'th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th' ];

  audio = new Audio();

  constructor(
    private citationService: CitationService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.audio.src = '../../../assets/Congratulations.mp3';
    this.audio.load();

    this.upSub = this.citationService.updates.subscribe(updates => {
      this.update(updates);
    });
    this.citationService.requestInit();
  }

  ngOnDestroy() {
    this.upSub.unsubscribe();
  }

  update(data) {
    const isInit = this.memberIdToCitation === null;
    this.memberIdToCitation = this.memberIdToCitation || {};
    this.citationUpdated = [];
    for (const member of data) {
      if (!isInit && this.memberIdToCitation[member.id] !== member.value) {
        member.prevValue = this.memberIdToCitation[member.id];
        this.citationUpdated.push(member);
      }
      this.memberIdToCitation[member.id] = member.value;
    }
    if (this.citationUpdated.length) {
      this.showUpdateCover = true;
      this.playCongrats();
      setTimeout(() => { this.showUpdateCover = false; this.audio.pause(); }, COVER_DURATION);
    }

    console.log(data);
    console.log(' > updated:', this.citationUpdated);
    this.citations = data.sort((a, b) => {
      return a.value > b.value ? -1 : (a.id < b.id ? -1 : 1);
    });
  }

  playCongrats() {
    this.audio.currentTime = 0;
    this.audio.play();
  }

  getPhotoBgStyle(mid) {
    if (!(mid in this.memberIdToImage)) {
      return '';
    }
    return this.sanitizer.bypassSecurityTrustStyle(`background: url('${this.memberIdToImage[mid]}')`);
  }
}

interface MemberCitation {
  id: number;
  name: string;
  url: string;
  value: number;
}
