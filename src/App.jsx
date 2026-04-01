import { useMemo, useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  CalendarDays,
  Clock3,
  Baby,
  Leaf,
  Landmark,
  Send,
  Phone,
  User,
  MessageCircle,
  X,
  MapPin,
  ArrowRight,
} from 'lucide-react';

const events = [
  {
    id: 1,
    title: 'Рассвет у Соборной площади',
    location: 'Соборная площадь, Владимир',
    date: 'Суббота, 6 апреля · 10:30',
    duration: '1 ч 45 мин',
    price: '900 ₽',
    image:
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80',
    alt: 'Исторический центр Владимира и соборы рядом с Соборной площадью в мягком утреннем свете.',
  },
  {
    id: 2,
    title: 'Зелёный маршрут в Пушкинском парке',
    location: 'Пушкинский парк, Владимир',
    date: 'Воскресенье, 7 апреля · 12:00',
    duration: '2 ч',
    price: '700 ₽',
    image:
      'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1200&q=80',
    alt: 'Просторные дорожки парка для прогулки с колясками, зелёные деревья и спокойная атмосфера.',
  },
  {
    id: 3,
    title: 'Панорамы Лыбедской магистрали',
    location: 'Смотровые точки у Лыбедской магистрали',
    date: 'Среда, 10 апреля · 11:00',
    duration: '1 ч 30 мин',
    price: 'Бесплатно',
    image:
      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=80',
    alt: 'Городская архитектура Владимира и пешеходные маршруты рядом с Лыбедской магистралью.',
  },
  {
    id: 4,
    title: 'Тихая прогулка в Патриаршем саду',
    location: 'Патриарший сад, Владимир',
    date: 'Пятница, 12 апреля · 16:00',
    duration: '2 ч 10 мин',
    price: '850 ₽',
    image:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
    alt: 'Цветущий сад с прогулочными тропами, подходящими для родителей с детскими колясками.',
  },
];

const initialForm = {
  name: '',
  phone: '',
  social: '',
  eventName: '',
};

const HOW_IT_WORKS = [
  { icon: Baby, title: 'Выбираете прогулку', text: 'Подберите удобный маршрут по Владимирским локациям.' },
  { icon: Leaf, title: 'Приходите с коляской', text: 'Каждый маршрут заранее адаптирован для комфортного темпа.' },
  { icon: Landmark, title: 'Знакомитесь и отдыхаете', text: 'Получайте новые впечатления и поддержку мам-сообщества.' },
];

export default function App() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [sending, setSending] = useState(false);

  const sortedEvents = useMemo(() => events, []);

  const openModal = (eventItem) => {
    setSelectedEvent(eventItem);
    setFormData((prev) => ({ ...prev, eventName: eventItem.title }));
    setStatus({ type: '', message: '' });
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setFormData(initialForm);
    setStatus({ type: '', message: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus({ type: '', message: '' });

    const templateParams = {
      name: formData.name,
      phone: formData.phone,
      social: formData.social,
      event_name: formData.eventName,
      to_email: 'and1994pad@yandex.ru',
      subject: 'New Booking: Mamahod Vladimir',
      message: `Новая заявка на прогулку: ${formData.eventName}`,
    };

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setStatus({ type: 'success', message: 'Спасибо! Заявка отправлена. Мы свяжемся с вами в ближайшее время.' });
      setFormData(initialForm);
    } catch {
      setStatus({ type: 'error', message: 'Не удалось отправить заявку. Проверьте EmailJS настройки и попробуйте снова.' });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream text-sage-700">
      <header className="border-b border-sage-100 bg-cream/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-wood-500">Mamahod Community</p>
            <h1 className="text-2xl font-semibold">Mamahod Vladimir</h1>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-sage-100 bg-white px-4 py-2 text-sm md:flex">
            <MapPin size={16} /> Владимир
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-2 md:py-20">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-sage-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sage-700">
              Прогулки для мам с колясками
            </p>
            <h2 className="text-4xl font-semibold leading-tight text-sage-700 md:text-5xl">
              Организованные прогулки по Владимиру с заботой о маме и малыше
            </h2>
            <p className="max-w-xl text-base text-sage-700/80 md:text-lg">
              Тёплое городское сообщество, проверенные маршруты и вдохновляющие встречи в атмосфере soft-tech и спокойствия.
            </p>
            <a
              href="#events"
              className="inline-flex items-center gap-2 rounded-full bg-wood-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-wood-700"
            >
              Смотреть прогулки <ArrowRight size={16} />
            </a>
          </div>
          <div className="rounded-3xl border border-sage-100 bg-white p-6 shadow-soft">
            <h3 className="mb-5 text-xl font-semibold">Как это работает</h3>
            <div className="space-y-5">
              {HOW_IT_WORKS.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex items-start gap-3">
                  <div className="rounded-xl bg-sage-100 p-2">
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="font-medium">{title}</p>
                    <p className="text-sm text-sage-700/70">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="events" className="mx-auto max-w-6xl px-4 pb-16">
          <div className="mb-6 flex items-end justify-between">
            <h3 className="text-2xl font-semibold md:text-3xl">Ближайшие прогулки</h3>
            <p className="text-sm text-sage-700/70">Mobile-first · MVP</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {sortedEvents.map((eventItem) => (
              <article key={eventItem.id} className="overflow-hidden rounded-2xl border border-sage-100 bg-white shadow-sm">
                <img src={eventItem.image} alt={eventItem.alt} className="h-44 w-full object-cover" loading="lazy" />
                <div className="space-y-3 p-4">
                  <h4 className="font-semibold">{eventItem.title}</h4>
                  <p className="flex items-center gap-2 text-sm text-sage-700/70">
                    <MapPin size={15} /> {eventItem.location}
                  </p>
                  <p className="flex items-center gap-2 text-sm">
                    <CalendarDays size={15} /> {eventItem.date}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="rounded-full bg-sage-50 px-2 py-1">{eventItem.price}</span>
                    <span className="flex items-center gap-1 text-sage-700/80">
                      <Clock3 size={14} /> {eventItem.duration}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => openModal(eventItem)}
                    className="w-full rounded-xl bg-sage-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-sage-500"
                  >
                    Register
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      {selectedEvent && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-sage-700/45 p-4">
          <div className="w-full max-w-md rounded-2xl border border-sage-100 bg-white p-5 shadow-soft">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h4 className="text-lg font-semibold">Регистрация на прогулку</h4>
                <p className="text-sm text-sage-700/70">{selectedEvent.title}</p>
              </div>
              <button type="button" onClick={closeModal} className="rounded-lg p-1 text-sage-700/70 hover:bg-sage-50">
                <X size={18} />
              </button>
            </div>

            <form className="space-y-3" onSubmit={handleSubmit}>
              <label className="block">
                <span className="mb-1 flex items-center gap-2 text-sm"><User size={14} /> Имя</span>
                <input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full rounded-xl border border-sage-100 px-3 py-2.5 outline-none ring-sage-300 focus:ring"
                />
              </label>
              <label className="block">
                <span className="mb-1 flex items-center gap-2 text-sm"><Phone size={14} /> Телефон</span>
                <input
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  className="w-full rounded-xl border border-sage-100 px-3 py-2.5 outline-none ring-sage-300 focus:ring"
                />
              </label>
              <label className="block">
                <span className="mb-1 flex items-center gap-2 text-sm"><MessageCircle size={14} /> Instagram / Telegram</span>
                <input
                  required
                  value={formData.social}
                  onChange={(e) => setFormData((prev) => ({ ...prev, social: e.target.value }))}
                  className="w-full rounded-xl border border-sage-100 px-3 py-2.5 outline-none ring-sage-300 focus:ring"
                />
              </label>
              <label className="block">
                <span className="mb-1 text-sm">Event Name</span>
                <input
                  required
                  value={formData.eventName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, eventName: e.target.value }))}
                  className="w-full rounded-xl border border-sage-100 bg-sage-50 px-3 py-2.5 outline-none ring-sage-300 focus:ring"
                />
              </label>

              {status.message && (
                <p className={`rounded-xl px-3 py-2 text-sm ${status.type === 'success' ? 'bg-sage-50 text-sage-700' : 'bg-red-50 text-red-600'}`}>
                  {status.message}
                </p>
              )}

              <button
                type="submit"
                disabled={sending}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-wood-500 px-4 py-2.5 font-medium text-white transition hover:bg-wood-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send size={16} /> {sending ? 'Отправляем...' : 'Отправить заявку'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
