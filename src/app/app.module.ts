import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment.prod';
import { EffectsModule } from '@ngrx/effects';
import { EntityDataModule, EntityDataService, EntityDefinitionService } from '@ngrx/data';
import { HttpClientModule } from '@angular/common/http';
import { entityConfig, entityMetadata } from './entity-metadata';
import { ProductsDataService } from './services/products-data.service';
import { ProductResolver } from './product.resolver';
import { CartsDataService } from './services/carts-data.service';
import { CartResolver } from './cart.resolver';
import { LayoutComponent } from './layout/layout.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production
    }),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig),

    ToastrModule.forRoot(), 
  ],
  providers: [
    ProductResolver, CartResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(
    eds: EntityDefinitionService,
    entityDataService: EntityDataService,
    productDataService: ProductsDataService,
    cartDataService: CartsDataService
) {
    eds.registerMetadataMap(entityMetadata);
    entityDataService.registerService('Product', productDataService);
    entityDataService.registerService('Cart', cartDataService);
}
}
