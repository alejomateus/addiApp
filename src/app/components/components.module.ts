import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterModule } from './footer/footer.module';
import { HeaderModule } from './header/header.module';

const MODULES = [FooterModule, HeaderModule];
@NgModule({
  declarations: [],
  imports: [CommonModule, ...MODULES],
  exports: [...MODULES],
})
export class ComponentsModule { }
