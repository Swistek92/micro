import { Controller } from '@nestjs/common';
import {
  ProductRequest,
  ProductResponse,
  ProductServiceController,
  ProductServiceControllerMethods,
} from '@kafa-microservices/proto';
import { Observable } from 'rxjs';

@Controller('product')
@ProductServiceControllerMethods()
export class ProductController implements ProductServiceController {
  getProduct(
    request: ProductRequest
  ): Promise<ProductResponse> | Observable<ProductResponse> | ProductResponse {
    return {
      productId: 12,
      name: 'laptop',
      price: 1000,
    };
  }
}
