"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconChevronDown } from "@tabler/icons-react";

const faqItems = [
  {
    question: "Что такое VPN?",
    answer:
      "VPN (Virtual Private Network) — это технология, которая создаёт зашифрованное соединение между вашим устройством и интернетом. Он скрывает ваш реальный IP-адрес, шифрует весь интернет-трафик и защищает ваши данные от перехвата.",
  },
  {
    question: "Как подключиться к VPN?",
    answer:
      "Процесс прост: зарегистрируйтесь на нашем сайте, скачайте приложение для вашей операционной системы, войдите в аккаунт и нажмите кнопку «Подключить». Весь процесс занимает буквально пару минут.",
  },
  {
    question: "Какие устройства поддерживаются?",
    answer:
      "ASCEND.VPN доступен на всех популярных платформах: Windows, macOS, Linux, iOS, Android. Также мы поддерживаем подключение через роутеры.",
  },
  {
    question: "Можно ли использовать на нескольких устройствах?",
    answer:
      "Да! Количество подключённых устройств зависит от выбранного плана: от 3 до 10 устройств одновременно.",
  },
  {
    question: "Ваши данные в безопасности?",
    answer:
      "Абсолютно. Мы используем 256-битное AES-шифрование — тот же стандарт, который применяют военные и банковские системы. Мы придерживаемся строгой политики отсутствия логов.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 px-4 scroll-mt-20">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Частые <span className="gradient-text">вопросы</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Не нашли ответ? Свяжитесь с нашей поддержкой, и мы поможем.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqItems.map((item, index) => (
            <motion.div
              key={item.question}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`glass overflow-hidden transition-all ${
                openIndex === index ? "border-accent-purple/30" : ""
              }`}
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
              >
                <span className="font-medium text-white">{item.question}</span>
                <IconChevronDown
                  className={`h-5 w-5 text-dim flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180 text-accent-purple" : ""
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 pt-0 text-muted text-sm leading-relaxed">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
