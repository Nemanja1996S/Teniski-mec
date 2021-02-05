using Microsoft.EntityFrameworkCore.Migrations;

namespace projekat.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Igrac",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Rang = table.Column<int>(type: "int", nullable: false),
                    Imeiprezime = table.Column<string>(name: "Ime i prezime", type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Godine = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Igrac", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Rezultat",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BrSet1 = table.Column<int>(type: "int", nullable: false),
                    BrSet2 = table.Column<int>(type: "int", nullable: false),
                    BrPoenaSeta1prvog = table.Column<int>(type: "int", nullable: false),
                    BrPoenaSeta1drugog = table.Column<int>(type: "int", nullable: false),
                    BrPoenaSeta2prvog = table.Column<int>(type: "int", nullable: false),
                    BrPoenaSeta2drugog = table.Column<int>(type: "int", nullable: false),
                    TrenutniSet = table.Column<int>(type: "int", nullable: false),
                    KrajMeca = table.Column<bool>(type: "bit", nullable: false),
                    Igrac1ID = table.Column<int>(type: "int", nullable: true),
                    Igrac2ID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rezultat", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Rezultat_Igrac_Igrac1ID",
                        column: x => x.Igrac1ID,
                        principalTable: "Igrac",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Rezultat_Igrac_Igrac2ID",
                        column: x => x.Igrac2ID,
                        principalTable: "Igrac",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Mec",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Lokacija = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    VremeOdrzavanja = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RezultatID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Mec", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Mec_Rezultat_RezultatID",
                        column: x => x.RezultatID,
                        principalTable: "Rezultat",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Mec_RezultatID",
                table: "Mec",
                column: "RezultatID");

            migrationBuilder.CreateIndex(
                name: "IX_Rezultat_Igrac1ID",
                table: "Rezultat",
                column: "Igrac1ID");

            migrationBuilder.CreateIndex(
                name: "IX_Rezultat_Igrac2ID",
                table: "Rezultat",
                column: "Igrac2ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Mec");

            migrationBuilder.DropTable(
                name: "Rezultat");

            migrationBuilder.DropTable(
                name: "Igrac");
        }
    }
}
