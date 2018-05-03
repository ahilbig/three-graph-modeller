import {Vertex} from "../graph-model/vertex";
import {Graph} from "../graph-model/graph";
import {Edge} from "../graph-model/edge";

export class EnterpriseInitialDataLoader {
  static initializeGraphModel(graphModel: Graph) {

    const vertexes: Vertex[] = [
      new Vertex('customer1', 'Customer', 'PERSON'),
      new Vertex('provider1', 'Digital Enterprise', 'ENTERPRISE'),
      new Vertex('pos1', 'Webshop', 'POS', "This is a sample of a webshop, fully equiped with almost everything on the IoT market"),
      new Vertex('billing1', 'Billing', 'BILLING', "Monitoring and billing backend"),
      new Vertex('camper1', 'My camper', 'CAMPER'),
      new Vertex('pickup1', 'My pickup', 'PICKUP')]
    const edges: Edge[] = [
      new Edge('provider1', 'pos1'),
      new Edge('provider1', 'billing1'),


      new Edge('customer1', 'pos1'),
      new Edge('pos1', 'billing1'),
      new Edge('customer1', 'pos1'),

      new Edge('billing1', 'customer1'),
      new Edge('pos1', 'camper1'),
      new Edge('pos1', 'pickup1'),
      new Edge('camper1', 'pickup1')
    ];
    const metadata = {name: 'My super company'};

    graphModel.initialize(vertexes, edges, metadata);

  }
}
