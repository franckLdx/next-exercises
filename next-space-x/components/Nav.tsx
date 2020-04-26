import React from 'react';
import Link from 'next/link'

export const Nav: React.FunctionComponent = () => <nav><ol><Link href="/launches">
  <a>Launches</a>
</Link></ol></nav>