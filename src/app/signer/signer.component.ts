import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signer',
  templateUrl: './signer.component.html',
  styleUrls: ['./signer.component.scss']
})
export class SignerComponent implements OnInit, OnDestroy {

  apiRootUrl = 'https://api.esign.kz';
  // apiRootUrl = 'http://localhost:8082';

  paperId: string;
  actionId: string;
  qr: string;
  timer;

  constructor(private route: ActivatedRoute,
              private http: HttpClient) {
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        this.paperId = params.p;
        this.actionId = params.a;
        console.log(this.paperId);
        console.log(this.actionId);
        console.log(params.q);
        if (params.q) {
          this.qr = params.q;
        } else if (this.paperId) {
          this.qr = 'https://msign.kz/qr?p=' + this.paperId;
        } else {
          this.qr = 'https://msign.kz/qr?a=' + this.actionId;
          // this.qr = this.actionId;
        }
        this.startTimer();
      });
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  startTimer() {
    this.timer = setInterval(() => {
      if (this.actionId) {
        this.http.get(this.apiRootUrl + '/actions?id=' + this.actionId).subscribe((value: any) => {
          console.log(value);
          if (value && value.originalResponse) {
            clearInterval(this.timer);
            this.closeWindow(value.originalResponse);
          }
        });
      } else if (this.paperId) {
        this.http.get(this.apiRootUrl + '/papers?id=' + this.paperId).subscribe((value: any) => {
          console.log(value);
          if (value && value.signedContent) {
            clearInterval(this.timer);
            this.closeWindow(value.signedContent);
          }
        });
      }
    }, 1500);
  }

  closeWindow(signedContent) {
    // alert(window);
    // alert(window.opener);
    if (window.opener) {
      window.opener.postMessage(signedContent, '*');
      window.close();
    }
  }
}
