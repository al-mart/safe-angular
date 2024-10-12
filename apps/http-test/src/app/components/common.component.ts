import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';

import { CommonApi } from '../services/common.api';

@Component({
  standalone: true,
  imports: [RouterModule, JsonPipe],
  selector: 'app-common',
  templateUrl: './common.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommonComponent {
  public commonApi = inject(CommonApi);
  public textToDisplay = toSignal(this.commonApi.testGet());
}
