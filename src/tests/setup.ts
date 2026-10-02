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

// jsdom n'implémente pas la lecture des médias.
vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue()
vi.spyOn(HTMLMediaElement.prototype, 'pause').mockReturnValue()
