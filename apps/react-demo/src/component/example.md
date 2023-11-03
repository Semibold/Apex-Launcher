# Example

## 1. Multi File

file1.tsx

```tsx
export const ExampleAtom = () => <p>example</p>
```

file2.tsx

```tsx
import { observer } from 'mobx-react-lite';
import { ExampleAtom } from './file1';

export const Example = observer(ExampleAtom)
```

## 2. Single File (decoupling)

```tsx
import { observer } from 'mobx-react-lite';

const ExampleAtom = () => <p>example</p>

export const Example = observer(ExampleAtom)
```

## 3. Single File (coupling)

```tsx
import { observer } from 'mobx-react-lite';

export const Example = observer(() => <p>example</p>)
```
