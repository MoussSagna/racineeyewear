import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

vi.stubGlobal(
	'IntersectionObserver',
	class IntersectionObserverMock {
		observe() {}
		unobserve() {}
		disconnect() {}
	},
)