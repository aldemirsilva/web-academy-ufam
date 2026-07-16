import Image from "next/image";

export function ProductCard() {
  return (
    <div className="card shadow-sm h-100">
      <Image
        src="/placeholder.png"
        className="card-img-top"
        alt="imagem placeholder"
        width={300}
        height={320}
      />
    </div>
  );
}
