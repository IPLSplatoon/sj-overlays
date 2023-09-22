import { D3BracketAnimator } from '@tourneyview/renderer';
import { SJSwissAnimator } from './SJSwissAnimator';
import { SJEliminationAnimator } from './SJEliminationAnimator';

export class SJBracketAnimator extends D3BracketAnimator {
    public readonly swissAnimator = new SJSwissAnimator();
    public readonly eliminationAnimator = new SJEliminationAnimator();
}
