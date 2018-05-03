import {AfterViewInit, Component, ElementRef, HostListener, Input, ViewChild} from '@angular/core';
import {Graph} from './graph-model/graph';
import '../shared/EnableJsLibs';
import '../../assets/fonts/optimer_regular.typeface.json'

import {CircleAutoGraphRenderer} from './graph-renderer/three-graph-renderer';
import * as THREE from "three";
import {EnterpriseInitialDataLoader} from "./graph-data-initializer/enterprise-initial-data-loader";

@Component({
  selector: 'app-graph-renderer',
  templateUrl: './graph-renderer.component.html',
  styleUrls: ['./graph-renderer.component.css']
})
export class GraphRendererComponent implements AfterViewInit {
  @Input()
  public rotationSpeedX = 0.005;
  @Input()
  public rotationSpeedY = 0.01;
  private graphModel: Graph;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  /* HELPER PROPERTIES (PRIVATE PROPERTIES) */

  @ViewChild('canvas')
  private canvasRef: ElementRef;

  private graphRenderer: CircleAutoGraphRenderer;
  /* STAGE PROPERTIES */
  @Input()
  public defaultObjectSize = 200;

  @Input()
  public cameraZ = 400;

  @Input()
  public fieldOfView = 70;

  @Input('nearClipping')
  public nearClippingPane = 1;

  @Input('farClipping')
  public farClippingPane = 1000;

//  private FONT_URL: string = 'node_modules/three/examples/fonts/helvetiker_bold.typeface.json';
  private FONT_URL: string = '/assets/fonts/optimer_regular.typeface.json';
  private font: THREE.Font;

  private modelsToLoad = 0
  private modelsLoaded = 0


  /* DEPENDENCY INJECTION (CONSTRUCTOR) */
  constructor() {
  }

  /* STAGING, ANIMATION, AND RENDERING */

  /* EVENTS */
  @HostListener('document:keyup', ['$event'])
  onKeyUp(ev: KeyboardEvent) {
    this.graphRenderer.inputManager.onKeyUp(ev);
  }

  /**
   * Update scene after resizing.
   */
  public onResize() {
    this.graphRenderer.setSceneSize(this.canvas.clientWidth, this.canvas.clientHeight);
  }

  loadFont(resourceURL: string, callback?: () => void): Promise<THREE.Font> {
    var loader = new THREE.FontLoader();
    var component = this;

    var promise = new Promise<THREE.Font>((resolve, reject) => {
      loader.load(
        // resource URL
        resourceURL,
        // Function when resource is loaded
        function (font) {
          // do something with the font
          component.font = font;
          resolve(font)
        },
        // Function called when download progresses
        function (xhr) {
          console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        // Function called when download errors
        function (xhr) {
          console.log('An error happened whie loading font');
          reject();
        }
      )
    });
    return promise;

  }

  loadColladaModel(resourceURL: string, callback?: () => void): Promise<THREE.ColladaModel> {
    var loader: THREE.ColladaLoader = new THREE.ColladaLoader()

    var component = this;

    var promise = new Promise<THREE.ColladaModel>((resolve, reject) => {
      loader.load(
        // resource URL
        resourceURL,
        // Function when resource is loaded
        function (model) {
          resolve(model)
        },
        // Function called when download progresses
        function (xhr) {
          console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        // Function called when download errors
        function (xhr) {
          console.log('An error happened while loading collada model');
          reject();
        }
      )
    });
    return promise;

  }

  /* LIFECYCLE */

  /**
   * We need to wait until template is bound to DOM, as we need the view
   * dimensions to create the scene. We could create the cube in a Init hook,
   * but we would be unable to add it to the scene until now.
   */
  public ngAfterViewInit() {
    // this.getDataFromFile('/assets/fonts/optimer_regular.typeface.json');
    this.loadFont(this.FONT_URL).then(font => this.onFontLoaded(font));
  }

  public getDataFromFile(filename) {       //this will read file and send information to other function
    fetch(filename)
      .then(response => response.text())
      .then(text => console.log(text))
  }

  private onFontLoaded(font: THREE.Font) {
    this.font = font;

    this.graphRenderer = new CircleAutoGraphRenderer(this.defaultObjectSize, this.rotationSpeedX, this.rotationSpeedY, this.font);
    this.graphRenderer.createScene(this.fieldOfView, this.canvas.clientWidth, this.canvas.clientHeight, this.nearClippingPane, this.farClippingPane, this.cameraZ);

    this.graphModel = new Graph(this.graphRenderer);
    this.graphRenderer.graphModel = this.graphModel;
    this.graphRenderer.createWebGLRenderer(this.canvas);

    this.modelsToLoad = 4
    this.loadColladaModel('/assets/models/camper1954airstream.dae').then(model => this.onModelLoaded("CAMPER", model));
    this.loadColladaModel('/assets/models/bycicle(xedapsuonngang).dae').then(model => this.onModelLoaded("BIKE", model));
    this.loadColladaModel('/assets/models/pickup/pickup.dae').then(model => this.onModelLoaded("PICKUP", model));
    this.loadColladaModel('/assets/models/parking_villa/parking_villa.dae').then(model => this.onModelLoaded("PARKING_VILLA", model));

  }

  public onModelLoaded(vtype: string, model: THREE.ColladaModel) {
    this.graphRenderer.addVertexRenderingPrototype(vtype, model.scene)

    this.modelsLoaded = this.modelsLoaded+1;
    if (this.modelsLoaded >= this.modelsToLoad) {
      EnterpriseInitialDataLoader.initializeGraphModel(this.graphModel);
      this.graphRenderer.autoLayout();
      this.graphRenderer.createControls();
      this.graphRenderer.startRenderingLoop();
    }
  }


}

