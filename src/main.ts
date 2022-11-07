import { HttpClientModule } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app/app.component';

import { environment } from './environments/environment';
import { PostEffects } from './store/effects/post';
import { postReducer } from './store/reducer/posts';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      HttpClientModule,
      StoreModule.forRoot({postReducer}),
      EffectsModule.forRoot([PostEffects]),
      StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
    )
  ],
});

