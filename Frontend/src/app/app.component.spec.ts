import { TestBed, ComponentFixture } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { SessionService } from './services/session.service';
import { MessageService } from './services/message.service';
import { ParticipantService } from "openvidu-angular";

import {mImage, message} from './Mocks/ComponentParameters'

describe("AppComponent", () => {
  let component: AppComponent;
  let httpClient: HttpClient;
  let matDialog: MatDialog;
  let sessionService: SessionService;
  let messageService: MessageService;
  let domSanitizer: DomSanitizer;
  let participantService: ParticipantService;

  
  beforeEach(() => {
    httpClient = jasmine.createSpyObj('HttpClient', ['post']);
    matDialog = jasmine.createSpyObj('MatDialog', ['open']);
    domSanitizer = jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustUrl']);
    sessionService = jasmine.createSpyObj('SessionService', ['createSession']);
    messageService = jasmine.createSpyObj('MessageService', ['createMessage']);
    participantService = jasmine.createSpyObj('ParticipantService', ['localParticipantObs']);
    component = new AppComponent(httpClient, matDialog, domSanitizer, sessionService, messageService,participantService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the sessionId', () => {
    expect(component.sessionId).toBe('panel-directive-example');
  });

  it('should taken the cookie', ()=>{
    component.checkCookie();
    expect(component.cookie).not.toEqual("");
  })

  it('should maximize image',()=>{
    component.formatImage(mImage);
    component.maximizeImage(mImage)
    expect(mImage).toBeDefined();
  });

  it('should recognise file type image',()=>{
    expect(component.recogniseFileType("image/png")).toEqual(1);
  });

  it('should recognise file type other type',()=>{
    expect(component.recogniseFileType("compressed;application/pdf")).toEqual(2);
  });

  it('should format Image', ()=>{
    component.formatImage(mImage);
    expect(mImage).toBeDefined();
  });

  it('should not format Image', ()=>{
    component.formatImage(message);
    expect(message['image']).toBeNull();
  });

  // Aquí puedes escribir más pruebas para verificar el comportamiento de tu componente

});