"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconChevronDown } from "@tabler/icons-react";

const faqItems = [
  {
    question: "Что такое VPN?",
    answer:
      "VPN (Virtual Private Network) — это технология, которая создаёт зашифрованное соединение между вашим устройством и интернетом. Он скрывает ваш IP и защищает данные.",
  },
  {
    question: "Как подключиться к VPN?",
    answer:
      "Зарегистрируйтесь, скачайте приложение, войдите в аккаунт и нажмите «Подключить». Весь процесс занимает пару минут.",
  },
  {
    question: "Какие устройства поддерживаются?",
    answer:
      "Windows, macOS, Linux, iOS, Android, планшеты и Smart TV. Также поддерживаем роутеры.",
  },
  {
    question: "Можно ли использовать на нескольких устройствах?",
    answer:
      "Да! От 3 до 10 устройств одновременно в зависимости от тарифа.",
  },
  {
    question: "Ваши данные в безопасности?",
    answer:
      "Абсолютно. Мы используем 256-битное шифрование и не храним логи активности.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Частые <span className="gradient-text">вопросы</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Не нашли ответ? Свяжитесь с поддержкой.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqItems.map((item, index) => (
            <motion.div
              key={item.question}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
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
