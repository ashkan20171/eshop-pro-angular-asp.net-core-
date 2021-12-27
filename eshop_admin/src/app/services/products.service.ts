import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {FilterProductsDTO} from '../DTOs/Products/FilterProductsDTO';
import {IResponseResult} from '../DTOs/Common/IResponseResult';
import {ProductCategory} from '../DTOs/Products/ProductCategory';
import {Product} from '../DTOs/Products/Product';
import {ProductDetailDTO} from '../DTOs/Products/ProductDetailDTO';
import {ProductCommentDTO} from '../DTOs/Products/ProductCommentDTO';
import {AddProductComment} from '../DTOs/Products/AddProductComment';
import {EditProductDTO} from '../DTOs/Products/EditProductDTO';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    constructor(
        private http: HttpClient
    ) {
    }

    getFilteredProducts(filter: FilterProductsDTO): Observable<IResponseResult<FilterProductsDTO>> {
        let params = new HttpParams();
        if (filter !== null) {
            params = new HttpParams()
                .set('pageId', filter.pageId.toString())
                .set('title', filter.title)
                .set('startPrice', filter.startPrice.toString())
                .set('endPrice', filter.endPrice.toString())
                .set('takeEntity', filter.takeEntity.toString());
            for (const category of filter.categories) {
                params = params.append('categories', category.toString());
            }

            if (filter.orderBy != null) {
                params = params.append('orderBy', filter.orderBy.toString());
            }
        }
        return this.http.get<IResponseResult<FilterProductsDTO>>('/products/filter-products', {params});
    }

    getProductActiveCategories(): Observable<IResponseResult<ProductCategory[]>> {
        return this.http.get<IResponseResult<ProductCategory[]>>('/products/product-active-categories');
    }

    getSingleProduct(productId: number): Observable<IResponseResult<ProductDetailDTO>> {
        return this.http.get<IResponseResult<ProductDetailDTO>>('/products/single-product/' + productId);
    }

    getRelatedProducts(productId: number): Observable<IResponseResult<Product[]>> {
        return this.http.get<IResponseResult<Product[]>>('/products/related-products/' + productId);
    }

    getProductComments(productId: number): Observable<IResponseResult<ProductCommentDTO[]>> {
        return this.http.get<IResponseResult<ProductCommentDTO[]>>('/products/product-comments/' + productId);
    }

    addProductComment(comment: AddProductComment): Observable<IResponseResult<ProductCommentDTO>> {
        return this.http.post<IResponseResult<ProductCommentDTO>>('/products/add-product-comment', comment);
    }

    getProductById(productId: number): Observable<IResponseResult<Product>> {
        return this.http.get<IResponseResult<Product>>('/products/get-product-by-id/' + productId);
    }

    getProductForEdit(productId: number): Observable<IResponseResult<EditProductDTO>> {
        return this.http.get<IResponseResult<EditProductDTO>>('/AdminProducts/get-product-for-edit/' + productId);
    }

    editProduct(product: EditProductDTO): Observable<IResponseResult<any>> {
        return this.http.post<IResponseResult<any>>('/AdminProducts/edit-product', product);
    }
}
